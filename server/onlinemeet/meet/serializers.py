from rest_framework import serializers
from .models import Channel, Room, ChannelMember
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password 
from meet.services import get_in_room_count

class RoomSerializer(serializers.ModelSerializer):
    in_room = serializers.SerializerMethodField('get_in_room')

    def get_in_room(self, room):
      return get_in_room_count(room)

    class Meta:
        model = Room
        fields = [field.name for field in model._meta.fields]
        fields.append('in_room')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email', 'first_name', 'last_name')

class ChannelMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ChannelMember
        fields = ("join_date", "user", "role")
        optional_fields = ['members', ]

class ChannelSerializer(serializers.ModelSerializer):
    owner = UserSerializer(required=False)
    members = ChannelMemberSerializer(source='channelmember_set', many=True, required=False)
    rooms = RoomSerializer(many=True, required=False)
    class Meta:
        model = Channel
        fields = [field.name for field in model._meta.fields]
        fields.append('members')
        fields.append('rooms')
        depth = 1
    


