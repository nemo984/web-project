from django.urls import path, include
from meet.views import UserList, UserDetail, ChannelViewSet, RoomViewSet, InviteLink, UserChannels, ChannelRoomToken, ChannelRooms, ChannelLeave
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("channels", ChannelViewSet, basename="channels")
router.register("rooms", RoomViewSet, basename="rooms")

urlpatterns = [
    path('', include(router.urls)),
    path('me/channels/', UserChannels.as_view()),
    path('me/channels/<int:pk>/leave/', ChannelLeave.as_view()),
    path('channels/<int:channel_id>/rooms/<int:room_id>/token', ChannelRoomToken.as_view()),
    path('channels/<int:pk>/rooms/', ChannelRooms.as_view()),
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('invite/<str:invite_code>', InviteLink.as_view()),
]
