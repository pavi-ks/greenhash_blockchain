from django.contrib import admin
from django.urls import path
from blockchain import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.home, name='home'),
    path('predict_crop/', views.predict_crop, name='predict_crop'),
    path('predict_fertilizer/', views.predict_fertilizer, name='predict_fertilizer'),
    path('get_labels/', views.get_encoder_labels, name='get_labels'),
    path('realtime-data/', views.get_realtime_data, name='realtime_data'),
]
