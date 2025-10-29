
FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_PAYSTACK_URL
ARG NEXT_PUBLIC_PAYSTACK_SECRET
ARG NEXT_PUBLIC_AUTH_URL
ARG NEXT_PUBLIC_ENV

# Validate environment variables immediately
RUN echo "Validating environment variables..." && \
    echo "NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}" && \
    echo "NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}" && \
    echo "NEXT_PUBLIC_AUTH_URL=${NEXT_PUBLIC_AUTH_URL}" && \
    (test -n "$NEXT_PUBLIC_SERVER_URL" || (echo "❌ Missing NEXT_PUBLIC_SERVER_URL" && exit 1)) && \
    (test -n "$NEXT_PUBLIC_AUTH_URL" || (echo "❌ Missing NEXT_PUBLIC_AUTH_URL" && exit 1)) && \
    (test -n "$NEXT_PUBLIC_URL" || (echo "❌ Missing NEXT_PUBLIC_URL" && exit 1)) && \
    (test -n "$NEXT_PUBLIC_PAYSTACK_SECRET" || (echo "❌ Missing NEXT_PUBLIC_PAYSTACK_SECRET" && exit 1)) && \
    (test -n "$NEXT_PUBLIC_PAYSTACK_URL" || (echo "❌ Missing NEXT_PUBLIC_PAYSTACK_URL" && exit 1)) && \
    echo "✅ All environment variables are valid"

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Runtime
FROM node:22-alpine

# Re-declare ARGs to make them available for ENV
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_PAYSTACK_URL
ARG NEXT_PUBLIC_PAYSTACK_SECRET
ARG NEXT_PUBLIC_AUTH_URL
ARG NEXT_PUBLIC_ENV

# Set as environment variables (for runtime)
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_AUTH_URL=${NEXT_PUBLIC_AUTH_URL}
ENV NEXT_PUBLIC_PAYSTACK_URL=${NEXT_PUBLIC_PAYSTACK_URL}
ENV NEXT_NEXT_PUBLIC_PAYSTACK_URL=${NEXT_PUBLIC_PAYSTACK_URL}
ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env* ./

# Verification step (optional)
RUN echo "Runtime Environment Variables:" && \
    echo "NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}" && \
    echo "NEXT_PUBLIC_AUTH_URL=${NEXT_PUBLIC_AUTH_URL}" && \
    echo "NEXT_PUBLIC_PAYSTACK_URL=${NEXT_PUBLIC_PAYSTACK_URL}" && \
    echo "NEXT_PUBLIC_PAYSTACK_SECRETL=${NEXT_PUBLIC_PAYSTACK_SECRET}" && \
    echo "NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}"
EXPOSE 3000
CMD ["npm", "start"]
