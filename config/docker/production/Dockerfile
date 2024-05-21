FROM node:12-alpine
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    libtool \
    make \
    nasm \
    openssh-client \
    git

ARG SSH_GITLAB_PRIVATE_KEY

RUN mkdir -p /root/.ssh && \
    eval `ssh-agent -s` && \
    echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > /root/.ssh/config


RUN echo "$SSH_GITLAB_PRIVATE_KEY" | tr -d '\r' > /root/.ssh/id_rsa && \
    chmod 700 /root/.ssh/id_rsa

CMD ssh-add /root/.ssh/id_rsa

# Create app directory
WORKDIR /base
COPY . /base
EXPOSE ${SERVER_PORT}

CMD ["sh", "-c", "npm run ${COMMAND}"]