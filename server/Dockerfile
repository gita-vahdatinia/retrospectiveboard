FROM centos:7.4.1708
RUN curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py" && python get-pip.py
COPY . /server
WORKDIR /server
RUN pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT ["/server/docker_entrypoint.sh"]