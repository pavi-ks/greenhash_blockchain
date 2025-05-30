# Base image
FROM python:3.10-slim

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
COPY dataset /app/dataset
# Ensure the ML models are copied
COPY blockchain/ml /app/blockchain/ml

# Expose port for the app
EXPOSE 8000

# Run the application
# It's a good practice to run as a non-root user, but for simplicity in this step, we'll run as root.
# This can be refined later if needed.
CMD ["gunicorn", "greenhash.wsgi:application", "--bind", "0.0.0.0:8000"]
