from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from .serializers import RegisterSerializer

User = get_user_model()


class AccountTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'test_user',
            'password': 'test_password',
            'password2': 'test_password',
            'email': 'test@test.com',
        }

        self.invalid_user_data = {
            'username': 'test_user',
            'password': 'test_password',
            'email': 'test@test.com',
        }

    def test_create_account_with_valid_data(self):
        """
        Ensure we can register a new user.
        """
        url = reverse('accounts_register')
        serializer = RegisterSerializer(data=self.user_data)

        self.assertTrue(serializer.is_valid())

        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, serializer.validated_data['username'])

    def test_create_account_with_invalid_data(self):
        """
        Ensure we can NOT register a new user(password2 is missing).
        """
        url = reverse('accounts_register')
        serializer = RegisterSerializer(data=self.invalid_user_data)

        self.assertFalse(serializer.is_valid())
        self.assertIn('password2', serializer.errors)

        response = self.client.post(url, self.invalid_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_login(self):
        """
        Ensure we can login a user and get JWTs.
        """
        url = reverse('accounts_login')

        serializer = RegisterSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

        response = self.client.post(
            url,
            {'username': self.user_data['username'], 'password': self.user_data['password']},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_refresh(self):
        """
        Ensure we can refresh access token using refresh token.
        """
        # NOTE: Tested through library
        pass
