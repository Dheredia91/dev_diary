from django.db import models
from django.contrib.auth.models import User

# meta data for category of notes
class Category(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    # good practice (used to label category by title)
    def __str__(self):
        return self.name

# meta data for all notes that are created
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # good practice (used to label notes by title)
    def __str__(self):
        return self.title

