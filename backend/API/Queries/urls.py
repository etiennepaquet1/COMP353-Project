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
from django.urls import path

from backend.API.Queries import Queries

urlpatterns = [
    path('Query8', Queries.Query_8),
    path('Query9', Queries.Query_9),
    path('Query10', Queries.Query_10),
    path('Query11', Queries.Query_11),
    path('Query12', Queries.Query_12),
    path('Query13', Queries.Query_13),
    path('Query14', Queries.Query_14),
    path('Query15', Queries.Query_15),
    path('Query16', Queries.Query_16_17),
    path('Query18', Queries.Query_18)
]
