# GitOps & Automated Delivery Pipelines

A containerized Node.js application deployed on Kubernetes using GitHub Actions, Docker, and Argo CD. This project demonstrates CI/CD automation and GitOps-based continuous delivery.

## Project Overview

The project automates application delivery using a Git-based deployment workflow.

- GitHub Actions builds and publishes Docker images.
- Docker Hub stores container images.
- Kubernetes runs the containerized application.
- Argo CD continuously monitors Git and synchronizes the desired application state with Kubernetes.

## Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    v
GitHub Actions
(Test & Build)
    |
    v
Docker Hub
(Container Image)
    |
    v
Git Repository
(Kubernetes Manifests)
    |
    v
Argo CD
(GitOps Synchronization)
    |
    v
Kubernetes Cluster
    |
    v
Running Application
```

## Technologies Used

| Technology | Purpose |
|---|---|
| Git & GitHub | Source code management |
| GitHub Actions | CI/CD automation |
| Docker | Containerization |
| Docker Hub | Image registry |
| Kubernetes | Container orchestration |
| Argo CD | GitOps continuous delivery |
| Kustomize | Kubernetes configuration management |
| Node.js | Application runtime |
| YAML | Pipeline and deployment configuration |

## Key Features

- Automated CI/CD workflow using GitHub Actions.
- Docker image build and publishing to Docker Hub.
- Kubernetes Deployment and Service configuration.
- Argo CD automated synchronization.
- Self-healing and automatic pruning.
- Kubernetes readiness and liveness probes.
- Two-replica application deployment.

## Deployment Verification

Successfully deployed and verified on a local Docker Desktop Kubernetes cluster.

**Verified results:**
- GitHub Actions workflow: Successful
- Docker Hub image: Published
- Argo CD Sync Status: Synced
- Argo CD Health Status: Healthy
- Kubernetes Pods: 2 Running
- Pod Restarts: 0
- Application Version: 1.0.0

## Application Access

Local application URL:

http://localhost:8081

Note: The application is accessible locally while Kubernetes port-forwarding is active. It is not a public production URL.

## Repository Structure

```text
gitops-automated-delivery/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yaml
│
├── app/
│   └── server.js
│
├── argocd/
│   └── application.yaml
│
├── k8s/
│   └── base/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── kustomization.yaml
│
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Project Links

- **GitHub Repository:** https://github.com/Harshada-07650/gitops-automated-delivery
- **Docker Hub:** https://hub.docker.com/r/harshudocker6257/gitops-delivery-demo

## Resume Highlights

- Developed a CI/CD pipeline using GitHub Actions to build and publish Docker images.
- Containerized a Node.js application using Docker and deployed it on Kubernetes.

- Configured Argo CD for GitOps-based continuous delivery and automated synchronization.

- Implemented Kubernetes health checks, self-healing, and declarative deployment management.



Project Status: Successfully deployed and verified on a local Kubernetes cluster.



### 5. Live Application Dashboard
![Live Application](screenshots/05-live-application.png)


**Project Status:** Successfully deployed and verified on a local Kubernetes cluster.
