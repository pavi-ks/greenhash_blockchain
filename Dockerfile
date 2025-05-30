# Base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project code
COPY manage.py /app/
COPY blockchain /app/blockchain
COPY greenhash /app/greenhash
# Ensure the ML models are copied
COPY blockchain/ml /app/blockchain/ml

# Copy the ABI file from the frontend directory to a location accessible by the backend
# The plan is to later update settings.py to point to this new relative path.
COPY frontend/src/contracts/GreenHashABI.json /app/blockchain/contracts/GreenHashABI.json

# Expose port for the app
EXPOSE 8000

# Run the application
# It's a good practice to run as a non-root user, but for simplicity in this step, we'll run as root.
# This can be refined later if needed.
CMD ["gunicorn", "greenhash.wsgi:application", "--bind", "0.0.0.0:8000"]
