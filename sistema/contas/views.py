from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm

def login_view(request):
    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')  # 'username' é o campo de email no AuthenticationForm
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                # Redireciona com base no tipo
                if user.tipo == 'C':
                    return redirect('menu_clinica')
                elif user.tipo == 'T':
                    return redirect('menu_terapeuta')
                else:
                    return redirect('menu_familiar')
    else:
        form = LoginForm()
    return render(request, 'contas/login.html', {'form': form})




