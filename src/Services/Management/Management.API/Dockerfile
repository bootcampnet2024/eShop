#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Management/Management.API/Management.API.csproj", "src/Services/Management/Management.API/"]
COPY ["src/Services/Management/Management.Domain/Management.Domain.csproj", "src/Services/Management/Management.Domain/"]
COPY ["src/Services/Management/Management.Infrastructure/Management.Infrastructure.csproj", "src/Services/Management/Management.Infrastructure/"]
RUN dotnet restore "./src/Services/Management/Management.API/Management.API.csproj"
COPY . .
WORKDIR "/src/src/Services/Management/Management.API"
RUN dotnet build "./Management.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Management.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Management.API.dll"]