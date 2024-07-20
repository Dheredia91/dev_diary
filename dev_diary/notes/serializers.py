from rest_framework import serializers
from .models import Note, Category

# Serializers convert Django model instances into JSON format
# so they can be sent over HTTP to the frontend

## CategorySerializer is a subclass of serializers.ModelSerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']
        read_only_fields = ['created_at']

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'content', 'category', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
