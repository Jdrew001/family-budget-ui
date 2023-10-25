import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.familybudget.app',
  appName: 'Family Budget',
  webDir: 'www',
  "server": {
    "androidScheme": "http",
    "cleartext": true,
    "allowNavigation": [
      "http://192.168.12.72:9000/api/*"
    ]
  },
  plugins: {
    extConfig: {},
    CapacitorUpdater: {
      privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAoC+l2xo1A7+wbhiJkrMhh6tCiinwKbfy0JFB/15tC5RHp6iQ\nXIEXzSMlilW5JrgJxl7t5JywuJyEhTpdUSu//sQVjkWDslY+FOccD59+KkDkz4J4\nAMvgQAnHzKs1bjW+lpFN3WrWrH2Pxunx6iFAmaeVF4glOP+LCNQ53sD+cnDoGoX8\n8ycE8Yxj9Zim9z/XOGfRB5QDl2JvE/mJDsYwXUgGGytmYDTtV3Eh22yfvWguscl+\nBbDcGNMXiiU50K1YirRSAoDxeRQXbuzFsaNFxb7dXPLVucLbsaNkU0vlirI/FF9C\nr9nM8MyBU1lWxAWIq9aMxLt/Va2QA8jNhGGzuQIDAQABAoIBABIkE0Zy+1oHVXXC\ndaIVg1CYBpsbEMXIvUj9ilnfWb4b9tl375FqVUW4G0JFXwiRgxniGlLvo9vkbeWg\nrHzK1Z2Gm2JXYQjLV5CKc9UZHPKwErmlbu24KRdXhDcblJt8nq7ymbzfopw6RBQk\n3m7DgUtlfS8DDiQcXKSNVFhzxt0y2k5GJ5IOTgGmIHbzJRbheU7SO/d/ZYsrpfwM\nBZPZaNcbGcQ6BKsC7VbiJNiuhiyWdAmBYwEvFSgkgXeSGCzdlHxXxR/IFFiNsSXE\ndeXZmGqd7nmNcWJzzci7KJNiqKalJmhU6UVfL25FicrBipd+kIdXli8hN3mDfEU0\n12XDf2ECgYEA0wwr7Ltfpoy5oqYDrmh4OQ90xRglnvwdbUJYv39gfOe6TCD87ZSN\nWk6EE/LgDTBenmCWXI8z5c76QBfKjGZFS1JWsa5Zaec7SY3b/mvnljeS1mXLbTDe\nFhQm6eM6XWOJDz7BeYetXmjFtTV3xTdR6YJyztfPnK4lziyGSRziBA0CgYEAwk4l\nbxBS/Yqw4UhId1mBLbSocpfGPimuPKw9DJ384+/u9saFFcSQLTiK99+9qN0JiszF\nJwfnUuRQZ41F7AUlb3TJd4FvecBFmjqNKxTo7h3alpuvEVeqv4awYNNulxPaKetw\nVsWCtARfGEPYaomyCMeQ8VznPhomFUmqhj75Z10CgYBrcqjyT7s0+jSQwGDjbMC4\nnEvhBJgyxzzcIYk5hcpEDV5l3+2lr5n/vjW0SlUToeqqS5aB7U6I08XI19QBgxgI\nbxVARPm010rx+c1lTN6NNiIGEbFuGBEZwIzHSy6t2T0wi8zI6PC1PjZaOayOtcl4\nTzfQY0OKC4en3jdIBfJ0CQKBgC0AwoTNyBr3I26aOkaCUXwPirA33O+K4dMlpWIl\nuWvlp3g6lJptE2OV5AHzLU9OGqauNL+MghRd0w2Y1+gJbRk6eGsYbIRLdxN4mjev\nOR/lhDo7xrmCj4aaoIFclxGgxHfPEw7V4iblmEzbceWDDNwhtL1iYiCtF8L4c+lx\n7nv1AoGBAKDwxQbhicDxgt5gdW/2o+CLtTndw2Q7g9bbIJEsVQMNdFz83shikOBc\nuAVcJ8PhNaG/ApWDAacSdhva3hF3PEUNNBBwpkz2TxlJC6fayURXHn7BEPzjub4V\nNKBuQA2oMWpBlZNpaYFu4i7BX8FN+Fl5fZ0X0A9cihdRvZY83Day\n-----END RSA PRIVATE KEY-----\n'
    }
  }
};

export default config;
