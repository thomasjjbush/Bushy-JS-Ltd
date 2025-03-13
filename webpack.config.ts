import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { Configuration } from 'webpack';
import type { Configuration as DevConfiguration } from 'webpack-dev-server';

type Modes = 'development' | 'production';

export default (_: Record<string, string>, { mode }: { mode: Modes }): Configuration & DevConfiguration => {
  const isProd = mode === 'production';

  return {
    devServer: {
      historyApiFallback: true,
    },
    devtool: isProd ? false : 'cheap-module-source-map',
    entry: {
      loading: './src/loading.ts',
      main: './src/index.tsx',
    },
    experiments: {
      topLevelAwait: true,
    },
    mode,
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
        {
          exclude: /\.module.scss$/,
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: !isProd } },
            { loader: 'sass-loader', options: { implementation: require('sass'), sourceMap: !isProd } },
          ],
        },
        {
          test: /\.module\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { modules: { exportLocalsConvention: 'camelCase' }, sourceMap: !isProd } },
            { loader: 'sass-loader', options: { implementation: require('sass'), sourceMap: !isProd } },
          ],
        },
        { test: /\.woff2$/, use: 'url-loader?limit=100000' },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            chunks: 'all',
            name: 'vendors',
            test: /node_modules/,
          },
        },
      },
    },
    output: {
      chunkFilename: '[name].chunk.js',
      clean: true,
      publicPath: '/',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: path.resolve(__dirname, './dist') }],
      }),
      new MiniCssExtractPlugin(),
      new CompressionPlugin(),
      new DotenvPlugin({ path: path.resolve(__dirname, isProd ? '.env.production' : '.env') }),
    ],
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components/'),
        '@const': path.resolve(__dirname, './src/const/'),
        '@hooks': path.resolve(__dirname, './src/hooks/'),
        '@modules': path.resolve(__dirname, './src/modules/'),
        '@services': path.resolve(__dirname, './src/services/'),
        '@store': path.resolve(__dirname, './src/store/'),
        '@translations': path.resolve(__dirname, './src/translations/'),
        '@types': path.resolve(__dirname, './src/types.ts'),
        '@utils': path.resolve(__dirname, './src/utils/'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
    },
  };
};
