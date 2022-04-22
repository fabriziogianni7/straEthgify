defmodule CronTest do
  use ExUnit.Case
  doctest Cron

  test "greets the world" do
    assert Cron.hello() == :world
  end
end
