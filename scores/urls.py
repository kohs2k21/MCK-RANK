from django.urls import path
from . import views

urlpatterns = [
    path('update/', views.update_score, name='update_score'),
    path('scores/', views.view_scores, name='view_scores'),
]
