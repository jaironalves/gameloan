ARG RUNTIME_IMAGE_VERSION=3.1-buster-slim
ARG SDK_IMAGE_VERSION=3.1-buster

FROM mcr.microsoft.com/dotnet/core/aspnet:${RUNTIME_IMAGE_VERSION} AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:${SDK_IMAGE_VERSION} AS build
WORKDIR /src
COPY ["GameLoan.API/GameLoan.API.csproj", "GameLoan.API/GameLoan.API.csproj"]
COPY ["GameLoan.Domain/GameLoan.Domain.csproj", "GameLoan.Domain/GameLoan.Domain.csproj"]
COPY ["GameLoan.Infrastructure/GameLoan.Infrastructure.csproj", "GameLoan.Infrastructure/GameLoan.Infrastructure.csproj"]
RUN dotnet restore "GameLoan.API/GameLoan.API.csproj"
COPY . .
WORKDIR /src
RUN dotnet build "GameLoan.API/GameLoan.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "GameLoan.API/GameLoan.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "GameLoan.API.dll"]
