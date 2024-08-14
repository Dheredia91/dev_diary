from rest_framework import viewsets
from .models import Note, Category
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import NoteSerializer, CategorySerializer, RegisterSerializer

# ModelViewSet is a type of viewset that provides default
# implementations for CRUD (Create, Read, Update, Delete) operations

class CategoryViewSet(viewsets.ModelViewSet):
    ## query all category objects
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can create categories
    

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can create notes

    def get_serializer_context(self):
        context = super(NoteViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context

class RegisterViewSet(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)
