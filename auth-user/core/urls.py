from django.urls import path
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView

from rest_framework.routers import DefaultRouter
from rest_framework_swagger.views import get_swagger_view
from rest_framework.documentation import include_docs_urls

from users.views import FacebookLogin

urlpatterns = [
    url(r'^docs/', include_docs_urls(title='User Auth API', description='RESTful API for Authentication.')),
    path('secret_admin_/', admin.site.urls),

    # User Authentication

    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),

    # Disable normal registration for now.
    # url(r'^auth/registration/', include('rest_auth.registration.urls')),
]
