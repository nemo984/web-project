from rest_framework.views import APIView, Response
from rest_framework import generics, permissions, viewsets
from meet.models import Channel, Room, ChannelMember
from django.contrib.auth.models import User
from rest_framework import status
from meet.serializers import UserSerializer, ChannelSerializer, RoomSerializer
from meet import services, models
import logging

logger = logging.getLogger("mylogger")

class UserList(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ChannelViewSet(viewsets.ModelViewSet):
    serializer_class = ChannelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        channels = Channel.objects.all()
        return channels
    
    def create(self, request, *args, **kwargs):
        c = Channel(owner=self.request.user)
        serializer = self.serializer_class(c, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cm = ChannelMember(user=request.user, channel=c, role=models.OWNER_ROLE)
            cm.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomViewSet(viewsets.ModelViewSet):
    """
    View to CRUD room

    * Requires authentication. TODO: permissions,
    """
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        rooms = Room.objects.all()
        return rooms


class UserChannels(APIView):
    """
    View to manipulate channels that a user is in.

    * Requires authentication.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        c = ChannelSerializer(request.user.channels, many=True)
        return Response(c.data, status=status.HTTP_200_OK)

class ChannelRooms(APIView):
    """
    View to list and create rooms inside a channel

    * Requires authentication. TODO: permissions
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        channel = Channel.objects.filter(pk=pk).first()
        if not channel:
            return Response({"message": "Channel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        

class ChannelLeave(APIView):
    """
    View to leave channel

    * Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        channel = Channel.objects.filter(pk=pk).first()
        if not channel:
            return Response({"message": "Channel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        channel.members.remove(request.user.id)
        return Response(status=status.HTTP_204_NO_CONTENT)

class InviteLink(APIView):
    """
    View to join a channel via invite link

    * Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, invite_code, format=None):
        channel = Channel.objects.filter(invite_code=invite_code).first()
        if not channel:
            return Response(status=status.HTTP_404_NOT_FOUND)
        channel.members.add(request.user.id)
        return Response(status=status.HTTP_204_NO_CONTENT)

class ChannelRoomToken(APIView):
    """
    View to get token for a room
    * Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, channel_id, room_id, format=None):
        logger.info(f'Received token request for channel id:{channel_id}, room id: {room_id} from {request.user.username}')
        channel = Channel.objects.filter(pk=channel_id).first()
        if not channel:
            return Response({"message": "Channel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        if not channel.members.filter(pk=request.user.id).exists():
            return Response({"message": "User is not a member of the channel"}, status=status.HTTP_403_FORBIDDEN)
        
        room = channel.rooms.filter(pk=room_id).first()
        if not room:
            return Response({"message": "Room Not Found"}, status=status.HTTP_404_NOT_FOUND)

        name = f'{request.user.first_name} {request.user.last_name}' if request.user.first_name != "" else request.user.username 
        token = services.create_room_token(f'{room.id}-{channel.name}-{room.name}', name)
        return Response({"token": token}, status=status.HTTP_200_OK)
