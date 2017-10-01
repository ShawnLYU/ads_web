"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import patterns, include, url
from views import *

from dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
    url(r'^mooncake/$', login),
    url(r'^mooncake/home/$', home),
    url(r'^mooncake/initializeExp/$', initializeExp, name='json'),
    url(r'^mooncake/register/$', register),
    url(r'^mooncake/tracking/$', tracking),
    url(r'^mooncake/checkSidEid/$', checkSidEid),
    url(r'^mooncake/afterClaiming/$', afterClaiming),
    url(r'^mooncake/prepareInfo/$', prepareInfo),
    url(r'^mooncake/recog/$', recog),
    url(r'^mooncake/beforerecog/$', beforerecog),
    url(r'^mooncake/beforeRecogAfterClaiming/$', beforeRecogAfterClaiming),
]
