from django.urls import path, include
from meet.views import UserList, UserDetail, ChannelViewSet, RoomViewSet, UserViewSet, InviteLink, UserChannels
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("channels", ChannelViewSet, basename="channels")
router.register("rooms", RoomViewSet, basename="rooms")

urlpatterns = [
    path('', include(router.urls)),
    path('me/', UserChannels.as_view()),
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('invite/<str:invite_code>', InviteLink.as_view()),
]
