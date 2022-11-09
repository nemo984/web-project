from rest_framework import serializers
from .models import Channel, Room
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password 

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = [field.name for field in model._meta.fields]
        fields.append('members')
        fields.append('rooms')
        depth = 1
    
class UserSerializer(serializers.ModelSerializer):
    members = ChannelSerializer(many=True)

    class Meta:
        model = User
        fields = ('id','username','email', 'first_name', 'last_name', 'members')

