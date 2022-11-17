from django.contrib import admin
from .models import Channel, Room, ChannelMember 
from django.contrib import admin
from django.contrib.auth.models import User

class ChannelAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "get_members", "owner", "invite_code"]

class RoomAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Room._meta.get_fields()]

class ChannelMemberAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ChannelMember._meta.get_fields()]

admin.site.register(Channel, ChannelAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(ChannelMember, ChannelMemberAdmin)