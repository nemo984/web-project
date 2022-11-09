from rest_framework import serializers
from .models import Channel, Room, ChannelMember
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password 

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email', 'first_name', 'last_name')

class ChannelMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ChannelMember
        fields = ("join_date", "user", "role")

class ChannelSerializer(serializers.ModelSerializer):
    members = ChannelMemberSerializer(source='channelmember_set', many=True)
    class Meta:
        model = Channel
        fields = [field.name for field in model._meta.fields]
        fields.append('members')
        fields.append('rooms')
        depth = 1
    


