function localtunnel {
  lt -s 3iu4r23rh348 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done