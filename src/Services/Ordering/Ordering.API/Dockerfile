#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
RUN apt-get update && apt-get install -y curl
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Ordering/Ordering.API/Ordering.API.csproj", "src/Services/Ordering/Ordering.API/"]
COPY ["src/Services/Ordering/Ordering.Infrastructure/Ordering.Infrastructure.csproj", "src/Services/Ordering/Ordering.Infrastructure/"]
COPY ["src/Services/Ordering/Ordering.Domain/Ordering.Domain.csproj", "src/Services/Ordering/Ordering.Domain/"]
RUN dotnet restore "./src/Services/Ordering/Ordering.API/Ordering.API.csproj"
COPY . .
WORKDIR "/src/src/Services/Ordering/Ordering.API"
RUN dotnet build "./Ordering.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Ordering.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Ordering.API.dll"]
