# Dockerfile
# Use the official Python image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install dependencies
COPY pyproject.toml /app/
RUN pip install --upgrade pip
RUN pip install .

# Setup GDAL
RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin python3-gdal

# Copy the Django project code
COPY ./api /app/

# Expose the Django port
EXPOSE 8000

# Run Django commands
CMD ["gunicorn", "core.wsgi"]
