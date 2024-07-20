from django.contrib import admin
from .models import Note, Category

# shows note and category on admin site
admin.site.register(Note)
admin.site.register(Category)

