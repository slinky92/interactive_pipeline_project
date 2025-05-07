from flask import Flask, render_template, request, jsonify
import logging
import time
import psutil

app = Flask(__name__)

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()  # Logs to console
    ]
)

@app.route('/')
def home():
    app.logger.info('Homepage accessed.')
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    start_time = time.time()
    process = psutil.Process()
    start_cpu = process.cpu_times()
    start_mem = process.memory_info().rss

    data = request.get_json()
    sequence = data.get('sequence', '')

    # Mapping DNA bases to binary
    binary_map = {'A': '00', 'C': '01', 'T': '10', 'G': '11'}
    binary = ''.join([binary_map.get(nuc.upper(), '??') for nuc in sequence])

    # Simulate a delay to observe resource usage more clearly
    time.sleep(2)  # Sleep for 2 seconds to simulate processing time

    end_cpu = process.cpu_times()
    end_mem = process.memory_info().rss
    elapsed_time = round(time.time() - start_time - 2, 4)
    cpu_time_used = round(end_cpu.user - start_cpu.user, 4)
    mem_used = round((end_mem - start_mem) / (1024 * 1024), 4)

    # Logging resource usage
    app.logger.info(f"CPU Time Used: {cpu_time_used} seconds")
    app.logger.info(f"Memory Used: {mem_used} MB")
    app.logger.info(f"Processing Time: {elapsed_time} seconds")

    return jsonify({
        "binary": binary,
        "cpu_time_used": cpu_time_used,
        "memory_used_mb": mem_used,
        "processing_time_sec": elapsed_time
    })

if __name__ == '__main__':
    app.run(debug=True)
