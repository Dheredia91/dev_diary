from rest_framework import viewsets
from .models import Note, Category
from .serializers import NoteSerializer, CategorySerializer

# ModelViewSet is a type of viewset that provides default
# implementations for CRUD (Create, Read, Update, Delete) operations

class CategoryViewSet(viewsets.ModelViewSet):
    ## query all category objects
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

