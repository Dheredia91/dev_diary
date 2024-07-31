from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, CategoryViewSet


## DefaultRouter will automatically generate URL routes for our viewsets
## The NoteViewSet is registered with the router under the URL prefix 'notes'

router = DefaultRouter()
router.register(r'notes', NoteViewSet)
router.register(r'categories', CategoryViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]
