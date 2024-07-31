from rest_framework import serializers
from .models import Note, Category
from django.contrib.auth.models import User # the register serializer uses a pre-built model

# Serializers convert Django model instances into JSON format
# so they can be sent over HTTP to the frontend

## CategorySerializer is a subclass of serializers.ModelSerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']

class NoteSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'content', 'category', 'category_name', 'created_at', 'updated_at']
        read_only_fields = ['user']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    # method to create a user
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user

