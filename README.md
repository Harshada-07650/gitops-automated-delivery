# GitOps & Automated Delivery Pipelines

A containerized Node.js application deployed on Kubernetes using GitHub Actions, Docker, and Argo CD. This project demonstrates automated CI/CD workflows and GitOps-based continuous delivery.

## Overview

This project implements an automated application delivery workflow using Git as the source of truth for Kubernetes deployment configurations.

GitHub Actions automates the CI/CD workflow and Docker image publishing, Docker Hub stores container images, Kubernetes manages application deployment, and Argo CD synchronizes the cluster with the desired state defined in Git.

## Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    v
GitHub Actions
(CI/CD Pipeline)
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
| Node.js | Application runtime |
| Git & GitHub | Source code management |
| GitHub Actions | CI/CD automation |
| Docker | Application containerization |
| Docker Hub | Container image registry |
| Kubernetes | Container orchestration |
| Argo CD | GitOps continuous delivery |
| Kustomize | Kubernetes configuration management |
| YAML | Pipeline and deployment configuration |

## Key Features

- Automated CI/CD workflow using GitHub Actions.
- Docker image build and publishing to Docker Hub.
- Kubernetes Deployment and Service configuration.
- GitOps-based application deployment using Argo CD.
- Automated synchronization and self-healing configuration.
- Automatic pruning configuration.
- Kubernetes readiness and liveness probes.
- Two-replica application deployment.
- Container resource requests and limits.

## Deployment and Verification

Successfully deployed and verified on a local Docker Desktop Kubernetes cluster.

| Verification | Result |
|---|---|
| GitHub Actions Workflow | Successful |
| Docker Hub Image | Published |
| Argo CD Sync Status | Synced |
| Argo CD Health Status | Healthy |
| Kubernetes Pods | 2 Running |
| Pod Restarts | 0 |
| Application Version | 1.0.0 |

## Application Access

The application can be tested locally in two ways:

**1. Node.js Application**

`http://localhost:3000/`

**2. Kubernetes Application**

`http://localhost:8081/`

To access the application through Kubernetes, run:

```bash
kubectl port-forward svc/gitops-demo -n gitops-demo 8081:80
```

Keep the terminal running while accessing the Kubernetes application.

**Note:** Both URLs are local development URLs. They are not publicly accessible.

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
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
└── package-lock.json
```

## Project Links

- **GitHub Repository:** [gitops-automated-delivery](https://github.com/Harshada-07650/gitops-automated-delivery)
- **Docker Hub Repository:** [gitops-delivery-demo](https://hub.docker.com/r/harshudocker6257/gitops-delivery-demo)

---

**Project Status:** Successfully deployed and verified on a local Kubernetes cluster.
