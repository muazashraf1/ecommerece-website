from rest_framework import serializers
from .models import Product, Category, CartItem, Cart
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(
        source="product.price", max_digits=10, decimal_places=2, read_only=True
    )
    product_image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=False, write_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make username field optional since we accept email too
        self.fields['username'].required = False

    def validate(self, attrs):
        email = attrs.pop("email", None)
        username = attrs.get("username")
        password = attrs.get("password")

        # If email is provided, look up the username
        if email:
            try:
                user = User.objects.get(email__iexact=email)
                attrs["username"] = user.username
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {"detail": "No active account found with the given credentials"}
                )
        
        # If still no username, raise error
        if not attrs.get("username"):
            raise serializers.ValidationError(
                {"detail": "Either email or username must be provided"}
            )

        return super().validate(attrs)


class ResgisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Password not match")
        email = data.get("email", "")
        if email and User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "Email already registered"})
        return data

    def create(self, validate_data):
        username = validate_data["username"]
        email = validate_data.get("email", "")
        password = validate_data["password"]
        user = User.objects.create_user(
            username=username, email=email, password=password
        )
        return user
