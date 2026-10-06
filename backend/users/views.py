from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
# REGISTER
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if not username or not email or not password:
        return Response({
            "error": "All fields are required"
        }, status=400)
    if User.objects.filter(username=username).exists():
        return Response({
            "error": "Username already exists"
        }, status=400)
    if User.objects.filter(email=email).exists():
        return Response({
            "error": "Email already exists"
        }, status=400)
    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    return Response({
        "message": "Account created successfully"
    }, status=201)
    
# LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(
        username=username,
        password=password
    )
    if user is not None:
        return Response({
            "message": "Login successful",
            "username": user.username,
            "email": user.email
        })
    return Response({
        "error": "Invalid username or password"
    }, status=401)
