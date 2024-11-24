from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100, unique=True)  # 이름
    score = models.IntegerField(default=0)  # 점수

    def __str__(self):
        return self.name
from django.db import models

# Create your models here.
