<head>
    <style>
        .main-content {
            padding: 0px;
        }
        .login-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .login-container {
            width: 100%;
            max-width: 400px;
        }
        .login-container h2 {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .login-container button {
            margin-top: 1.5rem;
        }
    </style>
</head>

<div class="login-page">
    <div class="login-container">
        <h2>Accedi</h2>
        <form class="form-container">
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" id="password" name="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>