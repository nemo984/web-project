from django.db import models
from django.conf import settings
import random, string
import time

def random_code():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

class Channel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='channels', through='ChannelMember', blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    invite_code = models.CharField(max_length=10, editable=False, default=random_code) # Maybe another model, : expires, remove, etc.

    def get_members(self):
        return "\n".join([m.username for m in self.members.all()])

    def __str__(self):
        return self.name


OWNER_ROLE = "OWNER"
ADMIN_ROLE = "ADMIN"
MEMBER_ROLE = "MEMBER"

ROLES = (
    (OWNER_ROLE, 'Owner'),
    (ADMIN_ROLE, 'Admin'),
    (MEMBER_ROLE, 'Member'),
)

class ChannelMember(models.Model):
    join_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    role = models.CharField(choices=ROLES, default=MEMBER_ROLE, max_length=50)

    class Meta:
        ordering = ('join_date',) 

class Room(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    channel = models.ForeignKey(Channel, related_name='rooms', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


    def __str__(self):
        return self.name

    class Meta:
        ordering = ('created',)

