#!/bin/bash

/opt/mssql/bin/sqlservr &

# Wait for SQL Server to be ready
until /opt/mssql-tools18/bin/sqlcmd -C -No -U sa -P $SA_PASSWORD -Q "SELECT 1" > /dev/null 2>&1; do
  sleep 5
done

# Run the initialization script
/opt/mssql-tools18/bin/sqlcmd -C -No -U sa -P $SA_PASSWORD -i /data/app/init.sql

wait
