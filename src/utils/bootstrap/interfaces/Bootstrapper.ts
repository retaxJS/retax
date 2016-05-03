/**
 * Define a boostrapper. (something configurable and able to bootstrap something else)
 *
 * @export
 * @interface IBootstrapper
 * @template O Type of the input parameter of config
 * @template B Type of the input parameter of boostrap
 * @template R Type of the output parameter of boostrap
 */
export interface IBootstrapper<InputConfig, InputBootstrap, OutputBootstrap> {
  /**
   * Configure the boostrapper.
   */
  config(config: InputConfig): void;

  /**
   * Run the bootstrapper.
   */
  bootstrap(options?: InputBootstrap): OutputBootstrap;
}
