from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .models import Player

def update_score(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        win = request.POST.get('win') == 'Y'
        kda = float(request.POST.get('kda'))

        # 점수 계산 로직
        score = 0
        if win:
            score += 6
        else:
            score -= 3

        if kda >= 5:
            score += 10
        elif 4 <= kda < 5:
            score += 6
        elif 3 <= kda < 4:
            score += 2
        elif 2 <= kda < 3:
            score += 0
        elif 1 <= kda < 2:
            score -= 3
        elif 0 <= kda < 1:
            score -= 5

        # 데이터베이스에 저장 또는 업데이트
        player, created = Player.objects.get_or_create(name=name)
        player.score += score
        player.save()

        return redirect('view_scores')

    return render(request, 'scores/update_score.html')


def view_scores(request):
    players = Player.objects.all().order_by('-score')
    return render(request, 'scores/view_scores.html', {'players': players})
