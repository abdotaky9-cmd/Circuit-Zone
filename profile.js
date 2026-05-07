function updateProfileUI() {
  const nameEl = document.getElementById('profile-name');
  const avatar = document.getElementById('avatar-image');
  const pointsValue = document.getElementById('points-total');
  const pointsSummary = document.getElementById('points-summary');
  const progressFill = document.getElementById('progress-fill');
  const historyRoot = document.getElementById('purchase-history');
  const activityRoot = document.getElementById('activity-log');

  nameEl.textContent = userProfile.username || 'Guest';
  avatar.src = userProfile.avatar || 'https://via.placeholder.com/200/080913/ffffff?text=Avatar';
  pointsValue.textContent = `${userProfile.points} pts`;
  pointsSummary.textContent = `${userProfile.points} / ${REWARD_THRESHOLD} pts`;

  const fillValue = clamp(userProfile.points / REWARD_THRESHOLD * 100, 0, 100);
  progressFill.style.width = `${fillValue}%`;

  if (!userProfile.purchases.length) {
    historyRoot.innerHTML = '<div class="empty-state">No purchases yet. Buy components across the store to build your history.</div>';
  } else {
    historyRoot.innerHTML = userProfile.purchases.map(purchase => `
      <div class="history-item">
        <div class="history-row">
          <div>
            <div class="history-name">Order • ${formatDate(purchase.date)}</div>
            <div class="history-meta">${purchase.items.map(item => `${item.name} (${item.category})`).join(' • ')}</div>
          </div>
          <div class="history-name">${formatEGP(purchase.total)} EGP</div>
        </div>
      </div>
    `).join('');
  }

  if (!userProfile.activity.length) {
    activityRoot.innerHTML = '<div class="empty-state">No activity logged yet. Your Cart and Buy actions will appear here.</div>';
  } else {
    activityRoot.innerHTML = userProfile.activity.map(entry => `
      <div class="activity-item">
        <strong>${entry.action}</strong> • ${entry.category}
        <div>${entry.details}</div>
        <div style="margin-top:8px;color:var(--muted);font-size:11px;">${formatDate(entry.date)}</div>
      </div>
    `).join('');
  }
}

function uploadAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    userProfile.avatar = reader.result;
    saveUserProfile();
    updateProfileUI();
    addActivity('Upload Avatar', 'Profile', 'Updated profile picture');
    showToast('Avatar updated');
  };
  reader.readAsDataURL(file);
}

window.addEventListener('load', () => {
  loadUserProfile();
  loadCart();
  updateTopbar();
  updateProfileUI();
});
