"""
URL configuration for program project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('person/', include('API.Person.urls')),
    path('residence/', include('API.Residence.urls')),
    path('facility/', include('API.Facility.urls')),
    path('secondaryresidence/', include('API.SecondaryResidence.urls')),
    path('workhistory/', include('API.WorkHistory.urls')),
    path('vaccine/', include('API.Vaccine.urls')),
    path('infection/', include('API.Infection.urls')),
    path('schedule/', include('API.Schedule.urls')),
]
