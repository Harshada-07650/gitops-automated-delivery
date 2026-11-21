# GitOps & Automated Delivery Pipelines

A beginner-friendly GitOps demonstration: GitHub Actions tests the Node.js app, builds and publishes a Docker image, updates the desired image tag in Git, and Argo CD synchronizes Kubernetes to that Git state.

## Architecture

Developer -> GitHub -> GitHub Actions (test/build) -> Docker Hub
                                      |
                                      v
                         Update k8s image tag in Git
                                      |
                                      v
                         Argo CD -> Kubernetes

## Requirements

- Windows 10/11, VS Code, Git and Docker Desktop
- A GitHub account and a Docker Hub account
- `kubectl` and a local Kubernetes cluster (Docker Desktop Kubernetes or kind)
- Internet connection

## 1. Create your GitHub repository

1. Create a public repository named `gitops-automated-delivery`.
2. Extract this ZIP and open the extracted folder in VS Code.
3. Replace `DOCKERHUB_USERNAME` in `k8s/base/deployment.yaml` with your Docker Hub username.
4. Replace `YOUR_GITHUB_USERNAME` in `argocd/application.yaml` with your GitHub username.
5. Open PowerShell in this project folder and run:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial GitOps project"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gitops-automated-delivery.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## 2. Add GitHub Actions secrets

In GitHub: repository -> Settings -> Secrets and variables -> Actions -> New repository secret.

Create:
- `DOCKERHUB_USERNAME`: your Docker Hub username
- `DOCKERHUB_TOKEN`: a Docker Hub access token (not your account password)

Create the token in Docker Hub -> Account Settings -> Personal access tokens. Give it read/write access. Keep it secret.

Push a small change to a file under `app/` to trigger the workflow. Check the Actions tab. The workflow tests the app, builds the image, pushes a commit-specific image to Docker Hub, and updates `k8s/base/kustomization.yaml`.

## 3. Test the app locally

```powershell
docker build -t gitops-delivery-demo:local .
docker run --rm -p 3000:3000 gitops-delivery-demo:local
```

Open http://localhost:3000. Stop the container with Ctrl+C.

## 4. Prepare Kubernetes

Enable Kubernetes in Docker Desktop Settings -> Kubernetes, if that option is available in your Docker Desktop version. Wait until the cluster is running, then check:

```powershell
kubectl cluster-info
kubectl get nodes
```

If Docker Desktop Kubernetes is unavailable, install kind and create a local cluster:

```powershell
kind create cluster --name gitops-lab
kubectl cluster-info
```

## 5. Install Argo CD

Run:

```powershell
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl wait --for=condition=available deployment/argocd-server -n argocd --timeout=300s
```

Access the Argo CD UI in another PowerShell window:

```powershell
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Open https://localhost:8080 and accept the local development certificate warning. Get the initial password:

```powershell
$secret = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($secret))
```

Username: `admin`. Change the initial password after first login. Keep it private.

## 6. Connect Argo CD to your Git repository

Check `argocd/application.yaml` has your correct GitHub repository URL. Then run:

```powershell
kubectl apply -f argocd/application.yaml
kubectl get applications -n argocd
kubectl get pods -n gitops-demo
```

For a public GitHub repository, Argo CD can read the repo without credentials. For a private repository, configure repository credentials in Argo CD first.

## 7. Open the deployed application

```powershell
kubectl port-forward svc/gitops-demo -n gitops-demo 8081:80
```

Open http://localhost:8081.

## 8. Demonstrate automated GitOps deployment

1. Edit the heading or paragraph in `app/server.js`.
2. Commit and push the change:

```powershell
git add .
git commit -m "feat: update demo application"
git push
```

3. Watch the GitHub Actions workflow in the Actions tab.
4. Confirm the workflow pushed a new image tag and updated `k8s/base/kustomization.yaml`.
5. Watch Argo CD detect and sync the Git change.
6. Refresh http://localhost:8081 and show the updated application.

## Troubleshooting

- `kubectl` cannot connect: confirm Docker Desktop Kubernetes or kind is running; check `kubectl config current-context`.
- GitHub Actions login fails: verify both repository secrets and regenerate the Docker Hub token if needed.
- ImagePullBackOff: check the image name in `k8s/base/deployment.yaml`, Docker Hub repository visibility, and the tag in `k8s/base/kustomization.yaml`.
- Argo CD does not sync: check repository URL, branch (`main`), path (`k8s/base`), and application status with `kubectl describe application gitops-delivery-demo -n argocd`.
- App is not reachable: ensure the service and pods are ready, then rerun the port-forward command.

## Resume description

**GitOps & Automated Delivery Pipelines | GitHub Actions, Docker, Docker Hub, Kubernetes, Argo CD, Kustomize**
- Built a CI pipeline using GitHub Actions to test a Node.js application and build/publish versioned Docker images.
- Automated Git-based Kubernetes manifest image-tag updates to maintain a declarative desired state.
- Configured Argo CD automated synchronization and self-healing to deploy Git changes to Kubernetes.
- Validated application health using Kubernetes readiness and liveness probes.

Only list tools and steps you have personally completed and can explain in an interview.

## Important

This repository is a prepared project starter, not a claim that deployment has already succeeded. Complete the account setup and run the verification steps to produce genuine screenshots and deployment evidence. Do not publish passwords or tokens.
