import time, redis

r = redis.Redis(host='redis', port=6379)

print("Worker started...")

while True:
    task = r.lpop('tasks')
    if task:
        print(f"Processing task: {task}")
    else:
        print("No tasks found, waiting...")
    time.sleep(5)
