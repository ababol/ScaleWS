ScaleWS
=======

#How to hack the scale
First, you need to register the scale to a network/hotspot controlled by you. When the scale is registered, you can configure the DNS Server.

Indeed, in order to hack the scale, you need to redirect the domain scalews.withings.net directly on your server. This server host the ScaleWS application:
<img src="https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/scalews_dns_schema.png" width="562" height="505"/>

On a GNU/Linux system, you can configure your own DNS-Server with [bind9](https://wiki.debian.org/Bind9), here is [an example](https://raw.githubusercontent.com/Fedonono/ScaleWS/master/doc/resources/example_dns_config.zip).

# How does ScaleWS work
