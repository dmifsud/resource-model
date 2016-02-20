module.exports = {
  context: __dirname + '/src',
  entry: './resourceful/examples/ServiceLayer/example.ts',
  output: {
    path: __dirname + '/build',
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};
