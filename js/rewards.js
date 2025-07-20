// rewards.js
window.addEventListener("DOMContentLoaded", () => {
  const rewardsItems = document.getElementById("rewardsItems");

  // Mock server data (replace with actual API endpoint)
  const fetchTasks = async () => {
    try {
      // Placeholder for server request
      // const response = await fetch('https://your-api.com/tasks', {
      //   method: 'GET',
      //   headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
      // });
      // const tasks = await response.json();

      // Mock data for demonstration
      const tasks = [
        { id: 1, description: "First Win", tokens: 100, completed: false },
        { id: 2, description: "Top 10 Leaderboard", tokens: 500, completed: true },
        { id: 3, description: "Daily Login", tokens: 50, completed: false },
        { id: 4, description: "Invite Friend", tokens: 200, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
        { id: 5, description: "Play 5 Games", tokens: 150, completed: false },
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
          ${task.tokens} ⚡
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
      const result = { success: true };
      if (result.success) {
        alert(`Claimed ${taskId} tokens!`);
        // Refresh task list
        loadTasks();
      } else {
        alert("Failed to claim reward.");
      }
    } catch (error) {
      console.error("[Rewards] Error claiming reward:", error);
      alert("Failed to claim reward. Please try again.");
    }
  };

  // Load and render tasks
  const loadTasks = async () => {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  };

  // Initial load
  loadTasks();

  // Event delegation for claim buttons
  rewardsItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("reward-button") && !e.target.disabled) {
      const taskId = e.target.dataset.taskId;
      console.log(`[Rewards] Claiming reward for task ${taskId}`);
      claimReward(taskId);
    }
  });
});