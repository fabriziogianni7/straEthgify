FROM python:3.8

WORKDIR /

COPY setup.py .

# install dependencies
RUN pip install pip==20.2.4
RUN pip install -e .

# copy the content of the local src directory to the working directory
COPY /backtester /backtester

# command to run on container start
CMD [ "python", "./backtester/main.py"]