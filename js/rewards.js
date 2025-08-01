window.addEventListener("DOMContentLoaded", () => {
  const rewardsItems = document.getElementById("rewardsItems");
  const tokenBalance = document.getElementById("tokenBalance");

  // Fetch token balance (mock for now, replace with API)
  const fetchTokenBalance = async () => {
    try {
      // Placeholder for server request
      // const response = await fetch('https://your-api.com/balance', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const data = await response.json();
      // return data.balance;

      // Mock balance
      return 2937;
    } catch (error) {
      console.error("[Rewards] Error fetching token balance:", error);
      return 0;
    }
  };

  // Update balance display
  const updateBalance = async () => {
    const balance = await fetchTokenBalance();
    if (tokenBalance) {
      tokenBalance.innerHTML = `${balance} <img class="token-icon" src="./img/token-logo.png" alt="Token">`;
    }
  };

  // Fetch tasks (mock data with corrected IDs)
  const fetchTasks = async () => {
    try {
      // Placeholder for server request
      // const response = await fetch('https://your-api.com/tasks', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const tasks = await response.json();

      // Mock data with unique IDs
      const tasks = [
        { id: 1, description: "First Win", tokens: 100, completed: false },
        { id: 2, description: "Top 10 Leaderboard", tokens: 500, completed: true },
        { id: 3, description: "Daily Login", tokens: 50, completed: false },
        { id: 4, description: "Invite Friend", tokens: 200, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 6, description: "Play 10 Games", tokens: 250, completed: false },
        { id: 7, description: "Share Game", tokens: 100, completed: false },
      ];
      return tasks;
    } catch (error) {
      console.error("[Rewards] Error fetching tasks:", error);
      alert("Failed to load tasks. Please try again.");
      return [];
    }
  };

  // Render tasks
  const renderTasks = (tasks) => {
    rewardsItems.innerHTML = "";
    tasks.forEach((task) => {
      const item = document.createElement("div");
      item.className = "reward-item";
      item.innerHTML = `
        <span class="reward-task">${task.description}</span>
        <button class="reward-button" data-task-id="${task.id}" ${
          task.completed ? "disabled" : ""
        }>
          ${task.tokens} <img class="token-icon" src="./img/token-logo.png" alt="Token">
        </button>
      `;
      rewardsItems.appendChild(item);
    });
  };

  // Handle claim action
  const claimReward = async (taskId) => {
    try {
      // Placeholder for server request
      // const response = await fetch(`https://your-api.com/claim/${taskId}`, {
      //   method: 'POST',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const result = await response.json();

      // Mock response
      const result = { success: true, tokens: parseInt(taskId) };
      if (result.success) {
        alert(`Claimed ${result.tokens} tokens!`);
        // Refresh task list and balance
        loadTasks();
        updateBalance();
      } else {
        alert("Failed to claim reward.");
      }
    } catch (error) {
      console.error("[Rewards] Error claiming reward:", error);
      alert("Failed to claim reward. Please try again.");
    }
  };

  // Load and render tasks and balance
  const loadTasks = async () => {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  };

  // Initial load
  loadTasks();
  updateBalance();

  // Event delegation for claim buttons
  rewardsItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("reward-button") && !e.target.disabled) {
      const taskId = e.target.dataset.taskId;
      console.log(`[Rewards] Claiming reward for task ${taskId}`);
      claimReward(taskId);
    }
  });
});