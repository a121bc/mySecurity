FROM java:8
#VOLUME /tmp
ADD /target/security-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8011
ENTRYPOINT [ "java", "-jar", "app.jar" ]